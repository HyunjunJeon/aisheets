import { $, component$ } from "@builder.io/qwik";
import {
  TbColumnInsertRight,
  TbColumns3,
  TbDownload,
  TbFilter,
  TbFold,
  TbPlayerPlay,
  TbRefresh,
} from "@qwikest/icons/tablericons";
import { Button, Popover, Select, buttonVariants } from "~/components/ui";
import { useModals } from "~/components/hooks/modals/use-modals";
import { useAddRowUseCase } from "~/usecases/add-row.usecase";
import { useColumnsStore } from "~/state";

export const Commands = component$(() => {
  const { openAddColumnModal } = useModals("addColumnModal");

  const { state: columns } = useColumnsStore();
  const addRowUseCase = useAddRowUseCase();

  const addFakeRows = $(async () => {
    addRowUseCase({
      data: {
        ...columns.value.reduce((acc, column) => {
          acc[column.name] = {
            generating: column.type === "prompt",
            value: "",
          };

          return acc;
        }, {} as any),
        name: {
          value: "John Doe",
        },
        age: {
          value: "25",
        },
        email: {
          value: "john.doe@x.com",
        },
      },
    });
  });

  return (
    <div class="flex h-12 w-full items-center justify-between border-t">
      <div class="flex space-x-2">
        <Popover.Root flip={false} gutter={8} floating="bottom-start">
          <Popover.Trigger
            class={buttonVariants({
              look: "ghost",
              size: "sm",
            })}
          >
            <div class="flex items-center gap-1 font-light">
              <TbColumns3 />
              Columns
            </div>
          </Popover.Trigger>

          <Popover.Panel class="rounded-none">
            <div class="flex items-center justify-between border-b">
              <h6 class="text-sm font-light">Columns</h6>

              <Button size="sm" look="link" class="flex gap-1 font-light">
                hide all
              </Button>
            </div>

            <div class="mt-1 flex flex-col gap-1">
              {columns.value.map((column) => (
                <div class="flex items-center gap-1" key={column.name}>
                  <input type="checkbox" checked={true} />
                  <span class="font-light">{column.name}</span>
                </div>
              ))}
            </div>
          </Popover.Panel>
        </Popover.Root>

        <Select.Root>
          <Select.Trigger
            hideIcon
            look="ghost"
            class={buttonVariants({
              look: "ghost",
              size: "sm",
            })}
          >
            <div class="flex items-center gap-1 font-light">
              <TbFold />
              Row height
            </div>
          </Select.Trigger>
          <Select.Popover class="w-4 rounded-none">
            <Select.Item>
              <Select.ItemLabel>Small</Select.ItemLabel>
            </Select.Item>
            <Select.Item>
              <Select.ItemLabel>Medium</Select.ItemLabel>
            </Select.Item>
            <Select.Item>
              <Select.ItemLabel>Normal</Select.ItemLabel>
            </Select.Item>
            <Select.Item>
              <Select.ItemLabel>Tall</Select.ItemLabel>
            </Select.Item>
            <Select.Item>
              <Select.ItemLabel>Complete</Select.ItemLabel>
            </Select.Item>
          </Select.Popover>
        </Select.Root>

        <Popover.Root flip={false} gutter={8} floating="bottom-start">
          <Popover.Trigger
            class={buttonVariants({
              look: "ghost",
              size: "sm",
            })}
          >
            <div class="flex items-center gap-1 font-light">
              <TbFilter />
              Filter
            </div>
          </Popover.Trigger>

          <Popover.Panel>
            <h6 class="text-sm">Filters</h6>
          </Popover.Panel>
        </Popover.Root>
      </div>

      <div class="flex space-x-2">
        <Button
          size="sm"
          look="outline"
          class="flex gap-1 font-light"
          onClick$={openAddColumnModal}
        >
          <TbColumnInsertRight />
          Add column
        </Button>

        <Button
          size="sm"
          look="outline"
          class="flex gap-1 border-purple-300 bg-purple-100 font-light"
          onClick$={addFakeRows}
        >
          <TbPlayerPlay />
          Run Prompt
        </Button>

        <Button
          size="sm"
          look="outline"
          class="flex gap-1 border-green-300 bg-green-100 font-light"
        >
          <TbRefresh />
          Sync with 🤗
        </Button>

        <Button size="sm" look="ghost" class="flex gap-1 font-light">
          <TbDownload />
        </Button>
      </div>
    </div>
  );
});
