import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { cn } from '../ui/utils';

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
  dialogClassName = 'lg:max-w-4xl',
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
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-[var(--farm-primary-text)] lg:text-lg">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-[var(--farm-secondary-text)]">
            Položky přidávejte a upravujte v samostatném dialogu.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleAdd}
          className="w-full shrink-0 gap-2 shadow-sm max-lg:justify-center lg:w-auto"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[var(--farm-border)] bg-white p-4 shadow-[var(--farm-shadow-sm)] transition-all duration-300 max-lg:rounded-2xl lg:rounded-3xl lg:p-5 lg:hover:-translate-y-0.5 lg:hover:shadow-[var(--farm-shadow-md)]"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
                <div className="min-w-0 w-full flex-1">
                  <div className="mb-2 inline-flex rounded-full bg-[var(--farm-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--farm-primary)]">
                    Položka {index + 1}
                  </div>
                  <h4 className="break-words text-base font-semibold leading-snug text-[var(--farm-primary-text)] lg:text-lg">
                    {getItemTitle(item, index)}
                  </h4>
                  {getItemSubtitle ? (
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--farm-secondary-text)]">
                      {getItemSubtitle(item, index)}
                    </p>
                  ) : null}
                </div>

                <div className="flex w-full flex-shrink-0 flex-wrap items-center justify-end gap-2 border-t border-[var(--farm-border)] pt-3 lg:w-auto lg:border-0 lg:pt-0">
                  <button
                    type="button"
                    onClick={() => handleEdit(item, index)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--farm-primary)]/20 bg-[var(--farm-primary-light)] px-3 py-2.5 text-sm font-medium text-[var(--farm-primary-text)] shadow-sm transition-all duration-300 hover:border-[var(--farm-primary)]/35 hover:bg-white hover:shadow-[var(--farm-shadow-sm)] sm:flex-none sm:rounded-full sm:px-4 lg:hover:-translate-y-0.5"
                  >
                    <Pencil className="h-4 w-4" />
                    Upravit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteItem(index)}
                    className="rounded-full p-2.5 text-red-600 transition-colors hover:bg-red-50"
                    aria-label={`Odstranit položku ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-[var(--farm-border)] bg-white py-8 text-center shadow-[var(--farm-shadow-sm)] lg:rounded-3xl lg:py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--farm-primary-light)] text-[var(--farm-primary)]">
              <Plus className="w-5 h-5" />
            </div>
            <p className="text-sm text-[var(--farm-secondary-text)]">{emptyStateText}</p>
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent
          className={cn(
            'max-h-[min(90dvh,100vh-0.5rem)] w-[calc(100vw-0.75rem)] max-w-[calc(100vw-0.75rem)] overflow-hidden rounded-2xl border border-[var(--farm-border)] bg-[var(--farm-page-bg)] p-0 shadow-[var(--farm-shadow-xl)]',
            'lg:max-h-[90vh] lg:w-full lg:rounded-[2rem]',
            dialogClassName,
            '[&>button]:top-3 [&>button]:right-3 [&>button]:rounded-full [&>button]:border [&>button]:border-[var(--farm-border)] [&>button]:bg-white [&>button]:p-2 [&>button]:text-[var(--farm-primary-text)] [&>button]:opacity-100 [&>button]:shadow-sm [&>button]:transition-colors [&>button]:hover:bg-[var(--farm-primary-light)] lg:[&>button]:top-5 lg:[&>button]:right-5',
          )}
        >
          <div className="flex max-h-[min(90dvh,100vh-0.5rem)] flex-col lg:max-h-[90vh]">
            <DialogHeader className="border-b border-[var(--farm-border)] bg-white/80 px-4 py-4 pr-14 text-left backdrop-blur-sm lg:px-6 lg:py-5 lg:pr-16">
              <div className="mb-2 inline-flex w-fit rounded-full bg-[var(--farm-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--farm-primary)] lg:mb-3">
                CMS editor
              </div>
              <DialogTitle className="text-xl text-[var(--farm-primary-text)] lg:text-2xl">
                {currentDialogTitle}
              </DialogTitle>
              {dialogDescription ? (
                <DialogDescription className="mt-1 text-sm text-[var(--farm-secondary-text)] lg:text-base">
                  {dialogDescription}
                </DialogDescription>
              ) : null}
            </DialogHeader>

            <div className="flex-1 overflow-y-auto overscroll-contain bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(244,252,241,0.35))] px-4 py-4 lg:px-6 lg:py-5">
              {draft ? renderForm({ draft, setDraft, isEditing }) : null}
            </div>

            <DialogFooter className="flex-col gap-2 border-t border-[var(--farm-border)] bg-white/90 px-4 py-3 backdrop-blur-sm max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-between lg:px-6 lg:py-4">
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
