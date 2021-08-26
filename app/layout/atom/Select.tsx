import React from "react";
import styled from "styled-components";
import { ButtonText } from "../../css/typography";
import { ChevronDown } from "../../icon/ChevronDown";

const SelectWrapper = styled.div`
    position: relative;
`;

const SelectFrame = styled.select<{ $isSecondary?: boolean }>`
    appearance: none;
    font: inherit;
    background: none;
    color: ${p => p.theme.white};
    height: ${p => !p.$isSecondary && p.theme.formHeight};
    padding: ${p => (p.$isSecondary ? "1rem 3.8rem 1rem 2rem" : "0 3.8rem 0 2rem")};
    min-width: 12.5rem;
    max-width: 25rem;
    border-radius: ${p => p.theme.radius};
    border-color: ${p => p.theme.gray200};
    color: ${p => p.theme.gray900};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const IconChevron = styled(ChevronDown)`
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    width: 1.8rem;
    height: 1.8rem;
    pointer-events: none;
`;

interface SelectProps {
    value: string;
    setValue: (value: string) => void;
    options: Record<string, string>;
    isSecondary?: boolean;
}

export const Select: React.FC<SelectProps> = ({ value, setValue, options, isSecondary }) => {
    return (
        <SelectWrapper>
            <ButtonText>
                <SelectFrame
                    value={value}
                    onChange={e => setValue((e.target as HTMLSelectElement).value)}
                    $isSecondary={isSecondary}>
                    {Object.keys(options).map(optionKey => (
                        <option key={optionKey} value={optionKey}>
                            {options[optionKey]}
                        </option>
                    ))}
                </SelectFrame>
            </ButtonText>
            <IconChevron />
        </SelectWrapper>
    );
};
