import { Component, Input, signal, ViewEncapsulation, output, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { useSkeleton } from '../../../skeletons/skeleton-factory';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
}

@Component({
  selector: 'ui-search',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, SkeletonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  placeholderValue = signal('Buscar...');
  resultsValue = signal<SearchResult[]>([]);
  expandedValue = signal(false);
  glassmorphicValue = signal(true);
  useSkeletonValue = signal(false);
  searchTermValue = signal('');
  popoverVisibleValue = signal(false);
  loadingValue = signal(false);

  // Skeleton
  private readonly skeletonState = useSkeleton<boolean>(800);
  showSkeleton = this.skeletonState.loading;

  // Event emitter
  search = output<string>();
  resultSelected = output<SearchResult>();
  popoverVisibleChange = output<boolean>();

  @Input() set placeholder(val: string) {
    this.placeholderValue.set(val);
  }

  @Input() set results(val: SearchResult[]) {
    this.resultsValue.set(val);
  }

  @Input() set expanded(val: boolean) {
    this.expandedValue.set(val);
  }

  @Input() set glassmorphic(val: boolean) {
    this.glassmorphicValue.set(val);
  }

  @Input() set useSkeleton(val: boolean) {
    this.useSkeletonValue.set(val);
  }

  @Input() set searchTerm(val: string) {
    this.searchTermValue.set(val);
  }

  @Input() set popoverVisible(val: boolean) {
    this.popoverVisibleValue.set(val);
    if (this.popoverVisibleValue() !== val) {
      this.popoverVisibleChange.emit(val);
    }
  }

  @Input() set loading(val: boolean) {
    this.loadingValue.set(val);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.popoverVisibleValue()) {
      const targetElement = event.target as HTMLElement;
      const isClickedInside = this.searchInput?.nativeElement.contains(targetElement) ||
        document.querySelector('.ui-search__popover-container')?.contains(targetElement);

      if (!isClickedInside) {
        this.popoverVisibleValue.set(false);
        this.popoverVisibleChange.emit(false);
      }
    }
  }

  onInputFocus() {
    if (this.searchTermValue() && this.searchTermValue().length > 0) {
      this.onSearch();
    }
  }

  onSearch() {
    this.search.emit(this.searchTermValue());
    if (!this.popoverVisibleValue()) {
      this.popoverVisibleValue.set(true);
      this.popoverVisibleChange.emit(true);
    }
  }

  onResultClick(result: SearchResult) {
    this.resultSelected.emit(result);
    this.popoverVisibleValue.set(false);
    this.popoverVisibleChange.emit(false);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    } else if (event.key === 'Escape' && this.popoverVisibleValue()) {
      this.popoverVisibleValue.set(false);
      this.popoverVisibleChange.emit(false);
    }
  }

  get searchClasses(): string {
    const classes = ['ui-search'];

    if (this.expandedValue()) classes.push('ui-search--expanded');
    if (this.glassmorphicValue()) classes.push('ui-search--glassmorphic');

    return classes.join(' ');
  }
}
