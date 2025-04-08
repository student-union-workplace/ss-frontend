export const getStatus = (status: 'open' | 'at_work' | 'review' | 'closed') => {
    switch (status) {
        case 'open':
            return 'Открыта';
        case 'at_work':
            return 'В работе';
        case 'review':
            return 'На проверке';
        case 'closed':
            return 'Выполнена';
        default:
            return
    }
}

export const getStatusColor = (status: 'open' | 'at_work' | 'review' | 'closed') => {
    switch (status) {
        case 'open':
            return '#1DB8CA';
        case 'at_work':
            return '#AF52DE';
        case 'review':
            return '#FF9500';
        case 'closed':
            return '#34C759';
        default:
            return
    }
}