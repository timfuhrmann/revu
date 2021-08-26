import { useMemo, useState } from "react";

export const useTeamsSearch = (teams: Data.Team[] | null) => {
    const [value, setValue] = useState<string>("");

    const filteredResults = useMemo(() => {
        if (!teams) {
            return null;
        }

        return teams.filter(team => team.name.toLowerCase().includes(value.toLowerCase()));
    }, [teams, value]);

    return {
        value,
        setValue,
        filteredResults,
    };
};
