import React, { useState } from "react";

interface DragValues {
    dragging: number;
    dragOver: number;
}

interface DragData {
    dragging: number | null;
    dragOver: number | null;
    handleDrop: (e: React.DragEvent) => void;
    handleDragOver: (e: React.DragEvent, index: number) => void;
    handleDragStart: (index: number) => void;
}

interface DragOptions {
    onDrop: (data: DragValues) => void;
}

export const useDrag = ({ onDrop }: DragOptions): DragData => {
    const [dragging, setDragging] = useState<number | null>(null);
    const [dragOver, setDragOver] = useState<number | null>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();

        if ((!dragging && dragging !== 0) || (!dragOver && dragOver !== 0)) {
            return;
        }

        onDrop({ dragging, dragOver });

        setDragging(null);
        setDragOver(null);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();

        if (dragOver !== index) {
            setDragOver(index);
        }
    };

    const handleDragStart = (index: number) => {
        setDragging(index);
    };

    return {
        dragging,
        dragOver,
        handleDragOver,
        handleDragStart,
        handleDrop,
    };
};
