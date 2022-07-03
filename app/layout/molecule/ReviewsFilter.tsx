import React, { useState } from "react";
import styled from "styled-components";
import { ButtonText } from "../../css/typography";
import { statusMap } from "../../lib/util";
import { DragIndicator } from "../../icon/Sliders";
import { useDrag } from "../../lib/hook/useDrag";

const FilterWrapper = styled.div``;

const FilterHead = styled.div`
    display: flex;
`;

const FilterDragArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
`;

const FilterChip = styled.button<{ $active: boolean }>`
    display: flex;
    border: 0.1rem solid ${p => (p.$active ? p.theme.primary : p.theme.gray600)};
    border-radius: ${p => p.theme.radius};
    padding: 1rem 1.5rem;
    margin-right: 1rem;
    color: ${p => (p.$active ? p.theme.gray900 : p.theme.gray600)};
    transition: border-color 0.1s, color 0.1s;
    will-change: border-color, color;

    &:last-child {
        margin: 0;
    }

    @media (hover: hover) {
        &:hover {
            color: ${p => !p.$active && p.theme.gray900};
            border-color: ${p => !p.$active && p.theme.gray900};
        }
    }
`;

const DragChip = styled.div<{ $dragging: boolean; $dragOver: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    border: 0.1rem solid ${p => (p.$dragOver && !p.$dragging ? p.theme.gray900 : p.theme.gray600)};
    border-radius: ${p => p.theme.radius};
    padding: 1rem;
    color: ${p => p.theme.gray900};
    cursor: grab;
`;

const IndicatorIcon = styled(DragIndicator)<{ $dragging: boolean }>`
    width: 1rem;
    height: 1.6rem;
    margin-right: 1rem;
    color: ${p => (p.$dragging ? p.theme.gray900 : p.theme.gray600)};
`;

interface ReviewsFilterProps {
    state: Filter.State;
    customOrder: string[];
    setState: (state: Filter.State) => void;
    setCustomOrder: (order: string[]) => void;
}

export const ReviewsFilter: React.FC<ReviewsFilterProps> = ({
    state,
    customOrder,
    setState,
    setCustomOrder,
}) => {
    const drag = useDrag({
        onDrop: ({ dragging, dragOver }) => {
            const order = [...customOrder];

            const a = order.splice(dragging, 1);
            const b = order.slice(0, dragOver);
            const c = order.slice(dragOver, customOrder.length - 1);

            setCustomOrder([...b, ...a, ...c]);
        },
    });

    return (
        <FilterWrapper>
            <FilterHead>
                <FilterChip type="button" $active={state === 0} onClick={() => setState(0)}>
                    <ButtonText>Oldest first</ButtonText>
                </FilterChip>
                <FilterChip type="button" $active={state === 1} onClick={() => setState(1)}>
                    <ButtonText>Latest first</ButtonText>
                </FilterChip>
                <FilterChip type="button" $active={state === 2} onClick={() => setState(2)}>
                    <ButtonText>Custom</ButtonText>
                </FilterChip>
            </FilterHead>
            {state === 2 && (
                <FilterDragArea>
                    {customOrder.map((statusKey, index) => {
                        const status = parseInt(statusKey) as Data.ReviewStatus;

                        return (
                            <DragChip
                                key={statusKey}
                                $dragging={drag.dragging === index}
                                $dragOver={drag.dragOver === index}
                                draggable
                                onDragStart={() => drag.handleDragStart(index)}
                                onDragOver={e => drag.handleDragOver(e, index)}
                                onDrop={drag.handleDrop}>
                                <IndicatorIcon $dragging={drag.dragging === index} />
                                <ButtonText>
                                    {index + 1}. {statusMap[status]}
                                </ButtonText>
                            </DragChip>
                        );
                    })}
                </FilterDragArea>
            )}
        </FilterWrapper>
    );
};
