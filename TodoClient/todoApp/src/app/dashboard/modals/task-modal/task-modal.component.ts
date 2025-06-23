import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../pages/tasks/task.model'; // Import the Task model

// Define the ModalMode type
export type ModalMode = 'create' | 'view' | 'edit' | 'delete';

@Component({
  selector: 'app-task-modal',
  standalone: true, // This modal is a standalone component
  // Import necessary modules for its template to function
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.component.html', // Link to the external HTML template
  styleUrls: ['./task-modal.component.css'] // Link to the external CSS file
})
export class TaskModalComponent implements OnInit, OnChanges {
  // --- Inputs ---
  // Controls the visibility of the modal
  @Input() isOpen = false;
  // Determines the modal's current mode (create, view, edit, delete)
  @Input() mode: ModalMode = 'create';
  // The task object passed to the modal for view, edit, or delete operations
  @Input() task: Task | null = null;
  // Indicates if an asynchronous operation (e.g., API call) is in progress
  @Input() isLoading = false;

  // --- Outputs ---
  // Emits when the modal should be closed
  @Output() close = new EventEmitter<void>();
  // Emits when a new task should be created (in 'create' mode)
  @Output() create = new EventEmitter<Task>();
  // Emits when an existing task should be updated (in 'edit' mode)
  @Output() update = new EventEmitter<Task>();
  // Emits when a task should be deleted (in 'delete' mode)
  @Output() delete = new EventEmitter<string>(); // Emits the task ID for deletion

  // Internal data model for the form, initialized with default values
  taskData: Task = {
    id: '',
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date()
  };

  get dueDateString(): string {
    if (!this.taskData.dueDate) {
      return '';
    }
    const year = this.taskData.dueDate.getFullYear();
    const month = (this.taskData.dueDate.getMonth() + 1).toString().padStart(2, '0');
    const day = this.taskData.dueDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  set dueDateString(value: string) {
    this.taskData.dueDate = value ? new Date(value) : undefined;
  }

  /**
   * Lifecycle hook: Called once after component initialization.
   * Initializes taskData based on input 'task' and 'mode'.
   */
  ngOnInit() {
    this.initializeTaskData();
  }

  /**
   * Lifecycle hook: Called when any input property changes.
   * Re-initializes taskData if 'task' or 'mode' inputs change.
   * @param changes Object containing changes to input properties.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] || changes['mode']) {
      this.initializeTaskData();
    }
  }

  /**
   * Initializes or resets the taskData based on the current mode and input task.
   * Ensures the form or display shows relevant data.
   */
  private initializeTaskData() {
    if (this.task && (this.mode === 'edit' || this.mode === 'view' || this.mode === 'delete')) {
      // For view, edit, or delete, use a copy of the input task
      this.taskData = { ...this.task };
    } else if (this.mode === 'create') {
      // For create mode, reset to default empty values with today's date
      this.taskData = {
        id: '',
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: new Date()
      };
    }
  }

  /**
   * Emits the 'close' event to hide the modal.
   */
  closeModal() {
    this.close.emit();
  }

  /**
   * Handles clicks on the modal backdrop. If the click is directly on the backdrop
   * (not on the modal content itself), it closes the modal.
   * @param event The mouse event.
   */
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  /**
   * Handles the primary action button click based on the current modal mode.
   * Emits the corresponding event (create, update, or delete).
   */
  onActionClick() {
    if (this.isLoading) {
      // Prevent multiple actions if already loading
      return;
    }

    // Ensure dueDate is a Date object before emitting
    if (this.taskData.dueDate && typeof this.taskData.dueDate === 'string') {
      this.taskData.dueDate = new Date(this.taskData.dueDate);
    }

    switch (this.mode) {
      case 'create':
        // Emit a copy of taskData for creation
        this.create.emit({ ...this.taskData });
        break;
      case 'edit':
        // Emit a copy of taskData for update
        this.update.emit({ ...this.taskData });
        break;
      case 'delete':
        // Emit the task ID for deletion
        if (this.taskData.id) {
          this.delete.emit(this.taskData.id);
        }
        break;
      case 'view': // In view mode, the action button typically acts as a 'Close'
        this.closeModal();
        break;
    }
  }

  /**
   * Returns the appropriate title for the modal based on its current mode.
   */
  getModalTitle(): string {
    const titles = {
      create: 'Create New Task',
      view: 'Task Details',
      edit: 'Edit Task',
      delete: 'Delete Task'
    };
    return titles[this.mode];
  }

  /**
   * Returns CSS classes for the header icon background and text color based on modal mode.
   */
  getHeaderIconClass(): string {
    const classes = {
      create: 'bg-green-500/20 text-green-400',
      view: 'bg-blue-500/20 text-blue-400',
      edit: 'bg-amber-500/20 text-amber-400',
      delete: 'bg-red-500/20 text-red-400'
    };
    return classes[this.mode];
  }

  /**
   * Returns the text for the primary action button based on modal mode.
   */
  getActionButtonText(): string {
    const texts = {
      create: 'Create Task',
      view: 'Close',
      edit: 'Save Changes',
      delete: 'Delete Task'
    };
    return texts[this.mode];
  }

  /**
   * Returns CSS classes for the primary action button based on modal mode and loading state.
   */
  getActionButtonClass(): string {
    const baseClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';
    const classes = {
      create: `bg-green-500/80 hover:bg-green-500 text-white ${baseClasses}`,
      view: `bg-white/10 hover:bg-white/20 text-white ${baseClasses}`, // View mode's action button is 'Close'
      edit: `bg-blue-500/80 hover:bg-blue-500 text-white ${baseClasses}`,
      delete: `bg-red-500/80 hover:bg-red-500 text-white ${baseClasses}`
    };
    return classes[this.mode];
  }

  /**
   * Returns CSS classes for priority display.
   * @param priority The priority value ('low', 'medium', 'high').
   */
  getPriorityClass(priority: string): string {
    const classes = {
      low: 'bg-green-500/20 text-green-400',
      medium: 'bg-amber-500/20 text-amber-400',
      high: 'bg-red-500/20 text-red-400'
    };
    return classes[priority as keyof typeof classes] || classes.medium;
  }

  /**
   * Returns CSS classes for status display.
   * @param status The status value ('pending', 'in-progress', 'completed').
   */
  getStatusClass(status: string): string {
    const classes = {
      pending: 'bg-gray-500/20 text-gray-400',
      'in-progress': 'bg-blue-500/20 text-blue-400',
      completed: 'bg-green-500/20 text-green-400'
    };
    return classes[status as keyof typeof classes] || classes.pending;
  }

  /**
   * Returns a user-friendly display string for task status.
   * @param status The raw status value.
   */
  getStatusDisplay(status: string): string {
    const displays = {
      pending: 'Pending',
      'in-progress': 'In Progress',
      completed: 'Completed'
    };
    return displays[status as keyof typeof displays] || status;
  }

  /**
   * Formats a Date object or undefined into a more readable local date string.
   * @param date The Date object to format.
   */
  formatDate(date: Date | undefined): string {
    if (!date) return 'No date set';
    // Ensure date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Checks if the form in 'create' or 'edit' mode is valid.
   * For view/delete modes, it always returns true as no form submission occurs.
   */
  isFormValid(): boolean {
    if (this.mode === 'view' || this.mode === 'delete') return true;
    // Basic validation: title and dueDate must not be empty
    return !!(this.taskData.title?.trim() && this.taskData.dueDate);
  }
}