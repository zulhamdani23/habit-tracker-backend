const habitDto = {}

habitDto.entityToDtoListHabit = (dto) => {
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

module.exports = habitDto;