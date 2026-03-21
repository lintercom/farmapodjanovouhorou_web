import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

function cloneDraft<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}

interface CmsCollectionEditorProps<T> {
  title: string;
  addLabel: string;
  items: T[];
  createItem: () => T;
  getItemTitle: (item: T, index: number) => string;
  getItemSubtitle?: (item: T, index: number) => string | undefined;
  emptyStateText: string;
  dialogTitle: {
    create: string;
    edit: string;
  };
  dialogDescription?: string;
  dialogClassName?: string;
  saveLabel?: string;
  onSaveItem: (draft: T, editingIndex: number | null) => void;
  onDeleteItem: (index: number) => void;
  renderForm: (args: {
    draft: T;
    setDraft: Dispatch<SetStateAction<T | null>>;
    isEditing: boolean;
  }) => ReactNode;
}

export function CmsCollectionEditor<T>({
  title,
  addLabel,
  items,
  createItem,
  getItemTitle,
  getItemSubtitle,
  emptyStateText,
  dialogTitle,
  dialogDescription,
  dialogClassName = 'sm:max-w-4xl',
  saveLabel = 'Uložit položku',
  onSaveItem,
  onDeleteItem,
  renderForm,
}: CmsCollectionEditorProps<T>) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<T | null>(null);

  const isEditing = editingIndex !== null;
  const isOpen = draft !== null;

  const currentDialogTitle = useMemo(
    () => (isEditing ? dialogTitle.edit : dialogTitle.create),
    [dialogTitle.create, dialogTitle.edit, isEditing],
  );

  const handleAdd = () => {
    setEditingIndex(null);
    setDraft(createItem());
  };

  const handleEdit = (item: T, index: number) => {
    setEditingIndex(index);
    setDraft(cloneDraft(item));
  };

  const handleClose = () => {
    setEditingIndex(null);
    setDraft(null);
  };

  const handleSave = () => {
    if (!draft) {
      return;
    }

    onSaveItem(draft, editingIndex);
    handleClose();
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)]">{title}</h3>
          <p className="mt-1 text-sm text-[var(--farm-secondary-text)]">
            Položky přidávejte a upravujte v samostatném dialogu.
          </p>
        </div>
        <Button variant="primary" onClick={handleAdd} className="gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          {addLabel}
        </Button>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-[var(--farm-border)] bg-white p-5 shadow-[var(--farm-shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--farm-shadow-md)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 inline-flex rounded-full bg-[var(--farm-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--farm-primary)]">
                    Položka {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-[var(--farm-primary-text)]">
                    {getItemTitle(item, index)}
                  </h4>
                  {getItemSubtitle ? (
                    <p className="mt-1 text-sm leading-relaxed text-[var(--farm-secondary-text)]">
                      {getItemSubtitle(item, index)}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(item, index)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--farm-primary)]/20 bg-[var(--farm-primary-light)] px-4 py-2 text-sm font-medium text-[var(--farm-primary-text)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--farm-primary)]/35 hover:bg-white hover:shadow-[var(--farm-shadow-sm)]"
                  >
                    <Pencil className="w-4 h-4" />
                    Upravit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteItem(index)}
                    className="rounded-full p-2.5 text-red-600 transition-colors hover:bg-red-50"
                    aria-label={`Odstranit položku ${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-[var(--farm-border)] bg-white py-12 text-center shadow-[var(--farm-shadow-sm)]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--farm-primary-light)] text-[var(--farm-primary)]">
              <Plus className="w-5 h-5" />
            </div>
            <p className="text-sm text-[var(--farm-secondary-text)]">{emptyStateText}</p>
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent
          className={`max-h-[90vh] overflow-hidden border border-[var(--farm-border)] bg-[var(--farm-page-bg)] p-0 shadow-[var(--farm-shadow-xl)] rounded-[2rem] ${dialogClassName} [&>button]:top-5 [&>button]:right-5 [&>button]:rounded-full [&>button]:border [&>button]:border-[var(--farm-border)] [&>button]:bg-white [&>button]:p-2 [&>button]:text-[var(--farm-primary-text)] [&>button]:opacity-100 [&>button]:shadow-sm [&>button]:transition-colors [&>button]:hover:bg-[var(--farm-primary-light)]`}
        >
          <div className="flex max-h-[90vh] flex-col">
            <DialogHeader className="border-b border-[var(--farm-border)] bg-white/80 px-6 py-5 pr-16 text-left backdrop-blur-sm">
              <div className="mb-3 inline-flex w-fit rounded-full bg-[var(--farm-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--farm-primary)]">
                CMS editor
              </div>
              <DialogTitle className="text-2xl text-[var(--farm-primary-text)]">
                {currentDialogTitle}
              </DialogTitle>
              {dialogDescription ? (
                <DialogDescription className="mt-1 text-[var(--farm-secondary-text)]">
                  {dialogDescription}
                </DialogDescription>
              ) : null}
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 py-5 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(244,252,241,0.35))]">
              {draft ? renderForm({ draft, setDraft, isEditing }) : null}
            </div>

            <DialogFooter className="border-t border-[var(--farm-border)] bg-white/90 px-6 py-4 sm:justify-between backdrop-blur-sm">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-[var(--farm-border)] text-[var(--farm-primary-text)] hover:border-[var(--farm-border)] hover:bg-[var(--farm-neutral-100)] hover:text-[var(--farm-primary-text)]"
              >
                Zrušit
              </Button>
              <Button type="button" variant="primary" onClick={handleSave} className="shadow-sm">
                {saveLabel}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
