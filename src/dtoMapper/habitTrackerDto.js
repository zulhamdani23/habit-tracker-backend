const habitTrackerDto = {}

habitTrackerDto.entityToDtoCekDone = (dto) => {
    let dataDto = {
        id: dto.id,
        isDone: dto.is_done
    }
    return dataDto
}

habitTrackerDto.entityToDtoListHabit = (dto) => {
    let dataDto = []
    dto.forEach(e => {
        let i = {}
        i.id = e.id,
        i.habitName = e.habit_name
        i.isActive = e.is_active
        dataDto.push(i)
    });
    return dataDto
}

module.exports = habitTrackerDto;