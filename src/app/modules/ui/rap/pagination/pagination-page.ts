/**
 * List of handler methods for page navigation events
 *
 * @export
 * @interface PaginationPage
 */
export interface PaginationPage {
    /**
     * Transition to the specified page.
     *
     * @param {number} page
     * @memberof IPagination
     */
    pageToHandler(page: number): void;
  
    /**
     * Transition to the previous page.
     *
     * @memberof IPagination
     */
    pagePrevHandler(): void;
  
    /**
     *Transition to the next page.
     *
     * @memberof IPagination
     */
    pageNextHandler(): void;
  
    /**
     * Actions after the transition to any page.
     *
     * @memberof IPagination
     */
    pageChangedHandler(): void;
  }
  