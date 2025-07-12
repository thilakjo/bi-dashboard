# BI Dashboard

A dummy business intelligence dashboard built with React and TypeScript, featuring interactive filtering functionality and data display.

## Features:

- Filter data based on column values
- Dynamic adjustment of filter options based on other active filters (Amazon-like behavior)
- Paginated data table (100 rows per page)
- Column-wise multi-select dropdown filters with search support
- Optimized for performance with large datasets

## Setup and Run:

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-link>
    cd bi-dashboard
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Place CSV data:**
    Ensure `dataset_small.csv` and `dataset_large.csv` are placed in the `public/` directory.
    (These files should be provided separately for the assignment).

4.  **Run the application:**
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

## Testing:

Run unit tests:

```bash
npm test
```
