import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import type {
  MRT_ColumnDef,
} from "material-react-table";

import { fetchRecords } from "./api/record";

import { DataTable } from "./components/DataTable";

import { useDebounce } from "./hooks/UseDebounce";

import { EditableCell } from "./components/EditableCell";

import { generateCSV } from "./util/csv";

const queryClient =
  new QueryClient();

function TablePage() {
  const [pagination, setPagination] =
    useState({
      pageIndex: 0,
      pageSize: 50,
    });

  const [sorting, setSorting] =
    useState<any[]>([]);

  const [globalFilter, setGlobalFilter] =
    useState("");

  const [genreFilter, setGenreFilter] =
    useState("");

  const [minPopularity, setMinPopularity] =
    useState("");

  const [maxPopularity, setMaxPopularity] =
    useState("");

  const [rowSelection, setRowSelection] =
    useState({});

  const savedVisibility =
    localStorage.getItem(
      "columnVisibility"
    );

  const [
    columnVisibility,
    setColumnVisibility,
  ] = useState(
    savedVisibility
      ? JSON.parse(
          savedVisibility
        )
      : {}
  );

  useEffect(() => {
    localStorage.setItem(
      "columnVisibility",
      JSON.stringify(
        columnVisibility
      )
    );
  }, [columnVisibility]);

  const debouncedSearch =
    useDebounce(globalFilter);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "records",
      pagination,
      sorting,
      debouncedSearch,
      genreFilter,
      minPopularity,
      maxPopularity,
    ],

    queryFn: async () => {
      const sort = sorting[0];

      return fetchRecords({
        _page:
          pagination.pageIndex + 1,

        _limit:
          pagination.pageSize,

        _sort: sort?.id,

        _order: sort?.desc
          ? "desc"
          : "asc",

        q: debouncedSearch,

        playlist_genre:
          genreFilter || undefined,

        track_popularity_gte:
          minPopularity || undefined,

        track_popularity_lte:
          maxPopularity || undefined,
      });
    },
  });

  const columns = useMemo<
    MRT_ColumnDef<any>[]
  >(
    () => [
      {
        accessorKey:
          "track_name",

        header: "Track",
      },

      {
        accessorKey:
          "track_artist",

        header: "Artist",

        Cell: ({
          cell,
          row,
        }: any) => (
          <EditableCell
            value={cell.getValue()}
            rowId={
              row.original.id
            }
            field="track_artist"
          />
        ),
      },

      {
        accessorKey:
          "playlist_genre",

        header: "Genre",
      },

      {
        accessorKey:
          "tempo",

        header: "Tempo",
      },

      {
        accessorKey:
          "track_popularity",

        header:
          "Popularity",
      },
    ],
    []
  );

  function exportCSV() {
    const csv =
      generateCSV(
        data?.rows ?? []
      );

    const blob =
      new Blob([csv]);

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      "records.csv";

    a.click();
  }

  function exportSelected() {
    const selectedRows =
      data?.rows?.filter(
        (
          _: any,
          index: number
        ) =>
          (
            rowSelection as Record<
              number,
              boolean
            >
          )[index]
      ) ?? [];

    const csv =
      generateCSV(
        selectedRows
      );

    const blob =
      new Blob([csv]);

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      "selected-records.csv";

    a.click();
  }

  if (error) {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <h2>
          Failed to load
          data
        </h2>

        <button
          onClick={() =>
            refetch()
          }
        >
          Retry
        </button>
      </div>
    );
  }

  if (
    !isLoading &&
    data?.rows?.length === 0
  ) {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        No results found
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 20,
        overflowX: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) =>
            setGlobalFilter(
              e.target.value
            )
          }
          style={{
            padding: 10,
            width: 250,
          }}
        />

        <select
          value={genreFilter}
          onChange={(e) =>
            setGenreFilter(
              e.target.value
            )
          }
        >
          <option value="">
            All Genres
          </option>

          <option value="pop">
            Pop
          </option>

          <option value="rap">
            Rap
          </option>

          <option value="rock">
            Rock
          </option>

          <option value="latin">
            Latin
          </option>
        </select>

        <input
          placeholder="Min Popularity"
          value={minPopularity}
          onChange={(e) =>
            setMinPopularity(
              e.target.value
            )
          }
        />

        <input
          placeholder="Max Popularity"
          value={maxPopularity}
          onChange={(e) =>
            setMaxPopularity(
              e.target.value
            )
          }
        />

        <button
          onClick={exportCSV}
        >
          Export CSV
        </button>

        <button
          onClick={
            exportSelected
          }
        >
          Export Selected
        </button>
      </div>

      {isLoading && (
        <div>
          Loading
          records...
        </div>
      )}

      <DataTable
        columns={columns}
        data={
          data?.rows ?? []
        }
        rowCount={
          data?.total ?? 0
        }
        state={{
          isLoading,
          pagination,
          sorting,
          rowSelection,
          columnVisibility,
        }}
        onPaginationChange={
          setPagination
        }
        onSortingChange={
          setSorting
        }
        onRowSelectionChange={
          setRowSelection
        }
        onColumnVisibilityChange={
          setColumnVisibility
        }
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      <TablePage />
    </QueryClientProvider>
  );
}