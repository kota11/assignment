import {
  useState,
} from "react";

import {
  updateRecord,
} from "../api/record";

type Props = {
  value: any;
  rowId: string | number;
  field: string;
};

export function EditableCell({
  value,
  rowId,
  field,
}: Props) {
  const [editing, setEditing] =
    useState(false);

  const [draft, setDraft] =
    useState(value);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function save() {
    if (!draft) {
      setError(
        "Value cannot be empty"
      );

      return;
    }

    try {
      setLoading(true);

      await updateRecord(rowId, {
        [field]: draft,
      });

      setEditing(false);

      setError("");
    } catch (err) {
      setError(
        "Failed to save"
      );
    } finally {
      setLoading(false);
    }
  }

  function cancelEdit() {
    setDraft(value);

    setEditing(false);

    setError("");
  }

  if (!editing) {
    return (
      <div
        onDoubleClick={() =>
          setEditing(true)
        }
        style={{
          cursor: "pointer",
        }}
      >
        {value}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <input
        value={draft}
        onChange={(e) =>
          setDraft(
            e.target.value
          )
        }
        style={{
          padding: 4,
        }}
      />

      <div
        style={{
          display: "flex",
          gap: 6,
        }}
      >
        <button
          onClick={save}
          disabled={loading}
        >
          Save
        </button>

        <button
          onClick={
            cancelEdit
          }
        >
          Cancel
        </button>
      </div>

      {error && (
        <span
          style={{
            color: "red",
            fontSize: 12,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}