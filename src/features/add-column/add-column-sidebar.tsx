import { $, component$, type QRL, useSignal, useTask$ } from "@builder.io/qwik";

import { LuCheck } from "@qwikest/icons/lucide";
import { TbX } from "@qwikest/icons/tablericons";
import { Sidebar, Button, Input, Label, Select } from "~/components";

import { type Column } from "~/state";
import { useModals } from "~/components/hooks/modals/use-modals";

interface SidebarProps {
  type: Column["type"];
  onCreateColumn: QRL<(column: Column) => void>;
}

export const AddColumnSidebar = component$<SidebarProps>(
  ({ onCreateColumn, type }) => {
    const { isOpenAddColumnSidebar, closeAddColumnSidebar } =
      useModals("addColumnSidebar");

    const types = ["text", "array", "number", "boolean", "object"];
    const newType = useSignal<Column["type"]>(type);
    const name = useSignal<Column["name"]>("");

    useTask$(({ track }) => {
      track(() => type);

      newType.value = type;
      name.value = "";
    });

    const onSave = $(() => {
      if (!name.value) return;

      const column: Column = {
        name: name.value,
        type: newType.value,
        generated: true, //this depends on kind of column type!
        sortable: false,
      };

      closeAddColumnSidebar();
      onCreateColumn(column);
    });

    return (
      <Sidebar bind:show={isOpenAddColumnSidebar}>
        <div class="flex h-full flex-col justify-between p-4">
          <div class="h-full">
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <Label for="column-name">Column name</Label>

                <Button size="sm" look="ghost" onClick$={closeAddColumnSidebar}>
                  <TbX />
                </Button>
              </div>
              <Input
                id="column-name"
                class="h-10"
                placeholder="Enter column name"
                bind:value={name}
              />

              <Select.Root class="h-10 w-48" bind:value={newType}>
                <Select.Trigger class="h-10 rounded-sm bg-blue-200">
                  <Select.DisplayValue />
                </Select.Trigger>
                <Select.Popover>
                  {types.map((type) => (
                    <Select.Item key={type}>
                      <Select.ItemLabel>{type}</Select.ItemLabel>
                      <Select.ItemIndicator>
                        <LuCheck class="h-4 w-4" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Popover>
              </Select.Root>
            </div>
          </div>

          <div class="flex h-16 w-full items-center justify-center">
            <Button size="sm" class="w-full rounded-sm p-2" onClick$={onSave}>
              Create new column
            </Button>
          </div>
        </div>
      </Sidebar>
    );
  },
);
