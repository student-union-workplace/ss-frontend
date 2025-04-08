export const getChipStatusColor = (status: string) => {
    switch (status) {
        case 'В работе':
            return `rgba(127, 253, 32, 0.15)`;
        case 'Завершено':
            return `rgba(33, 150, 243, 0.15)`;
        case 'Архив':
            return `rgba(239, 108, 0, 0.15)`;
        default:
            return
    }
}

export const getChipFontColor = (status: string) => {
    switch (status) {
        case 'В работе':
            return "#73C922";
        case 'Завершено':
            return '#36A6FF';
        case 'Архив':
            return '#FF8520';
        default:
            return
    }
}