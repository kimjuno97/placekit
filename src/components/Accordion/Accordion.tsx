import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import {
  accordionRootStyle,
  contentTextStyle,
  headingStyle,
  iconStyle,
  itemStyle,
  panelContentStyle,
  panelInnerStyle,
  panelShellStyle,
  titleStyle,
  triggerStyle,
} from "./Accordion.css";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenIds?: string[];
  allowMultiple?: boolean;
  className?: string;
};

export function Accordion({
  items,
  defaultOpenIds = [],
  allowMultiple = false,
  className,
}: AccordionProps) {
  const accordionId = useId();
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [openIds, setOpenIds] = useState(defaultOpenIds);
  const rootClassName = className
    ? `${accordionRootStyle} ${className}`
    : accordionRootStyle;

  const toggleItem = (itemId: string) => {
    const item = items.find((currentItem) => currentItem.id === itemId);

    if (item?.disabled) {
      return;
    }

    setOpenIds((currentIds) => {
      const isOpen = currentIds.includes(itemId);

      if (allowMultiple) {
        return isOpen
          ? currentIds.filter((currentId) => currentId !== itemId)
          : [...currentIds, itemId];
      }

      return isOpen ? [] : [itemId];
    });
  };

  const focusTrigger = (index: number) => {
    triggerRefs.current[index]?.focus();
  };

  const handleTriggerKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusTrigger((index + 1) % items.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusTrigger((index - 1 + items.length) % items.length);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTrigger(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTrigger(items.length - 1);
    }
  };

  return (
    <div className={rootClassName}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const isDisabled = Boolean(item.disabled);
        const triggerId = `${accordionId}-${item.id}-trigger`;
        const panelId = `${accordionId}-${item.id}-panel`;

        return (
          <section
            className={itemStyle}
            data-disabled={isDisabled || undefined}
            data-state={isOpen ? "open" : "closed"}
            key={item.id}
          >
            <h3 className={headingStyle}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={triggerStyle}
                disabled={isDisabled}
                id={triggerId}
                ref={(node) => {
                  triggerRefs.current[index] = node;
                }}
                type="button"
                onKeyDown={(event) => handleTriggerKeyDown(event, index)}
                onClick={() => toggleItem(item.id)}
              >
                <span className={titleStyle}>{item.title}</span>
                <span aria-hidden="true" className={iconStyle}>
                  ˅
                </span>
              </button>
            </h3>
            <div
              aria-hidden={!isOpen}
              aria-labelledby={triggerId}
              className={panelShellStyle({ open: isOpen })}
              id={panelId}
              role="region"
            >
              <div className={panelInnerStyle}>
                <div className={panelContentStyle({ open: isOpen })}>
                  <div className={contentTextStyle}>{item.content}</div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
