import { component$, type QRL, useSignal, $ } from "@builder.io/qwik";
import {
  TbAlignJustified,
  TbBraces,
  TbBrackets,
  TbDownload,
  TbHash,
  TbToggleLeft,
  TbX,
} from "@qwikest/icons/tablericons";

import { Button, Modal } from "~/components";

import { AddColumnSidebar } from "~/features/add-column/add-column-sidebar";

import { type Column } from "~/state";
import { useModals } from "~/components/hooks/modals/use-modals";

interface Props {
  onCreateColumn: QRL<(column: Column) => void>;
}

export const AddColumn = component$<Props>(({ onCreateColumn }) => {
  const { isOpenAddColumnModal, closeAddColumnModal } =
    useModals("addColumnModal");
  const { openAddColumnSidebar } = useModals("addColumnSidebar");

  const columnType = useSignal<Column["type"]>("text");

  const openSidebar = $((type: Column["type"]) => {
    closeAddColumnModal();

    columnType.value = type;

    openAddColumnSidebar();
  });

  return (
    <Modal.Root bind:show={isOpenAddColumnModal} class="h-max w-full">
      <Modal.Panel>
        <div class="mb-5 flex justify-between">
          <Modal.Title>New column</Modal.Title>
          <Button size="sm" look="ghost" onClick$={closeAddColumnModal}>
            <TbX />
          </Button>
        </div>
        <div class="flex justify-between gap-2">
          <div class="flex w-1/2 flex-col gap-2">
            <h4 class="text-sm text-gray-600">Import</h4>

            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:bg-lime-100"
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
                <TbDownload />
              </span>
              Import Column from
            </Button>

            <h4 class="text-sm text-gray-600">Static columns</h4>

            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:bg-blue-200"
              onClick$={() => openSidebar("text")}
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                <TbAlignJustified />
              </span>
              Text
            </Button>
            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:bg-rose-100"
              onClick$={() => openSidebar("number")}
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                <TbHash />
              </span>
              Number
            </Button>
            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:bg-lime-100"
              onClick$={() => openSidebar("boolean")}
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                <TbToggleLeft />
              </span>
              Boolean
            </Button>
            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:bg-yellow-100"
              onClick$={() => openSidebar("object")}
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                <TbBraces />
              </span>
              Object
            </Button>
            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:bg-indigo-300"
              onClick$={() => openSidebar("array")}
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                <TbBrackets />
              </span>
              Array
            </Button>
          </div>

          <div class="flex w-1/2 flex-col gap-2">
            <h4 class="text-xs text-gray-600">Dynamic columns</h4>

            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:border-green-200"
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-300">
                <TbToggleLeft />
              </span>
              From HF 🤗
            </Button>

            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:bg-blue-300"
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-300">
                <TbToggleLeft />
              </span>
              Run Prompt
            </Button>
            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:bg-cyan-200"
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-300">
                <TbToggleLeft />
              </span>
              Api Call
            </Button>
            <Button
              size="md"
              look="ghost"
              class="flex justify-start text-left text-sm hover:bg-yellow-100"
            >
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-300">
                <TbToggleLeft />
              </span>
              Extract from JSON
            </Button>
          </div>
        </div>
      </Modal.Panel>

      <AddColumnSidebar
        type={columnType.value}
        onCreateColumn={onCreateColumn}
      />
    </Modal.Root>
  );
});
