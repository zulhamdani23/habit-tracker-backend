const habitTrackerDto = {}

habitTrackerDto.entityToDtoListHabit = (dto) => {
    let dataDto = []
    dto.forEach(e => {
        let i = {}
        i.id = e.id,
        i.habitName = e.habit_name
        dataDto.push(i)
    });
    return dataDto
}

module.exports = habitTrackerDto;