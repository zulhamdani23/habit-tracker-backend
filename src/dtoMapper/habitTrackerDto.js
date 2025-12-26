const habitTrackerDto = {}

habitTrackerDto.entityToDtoCekDone = (dto) => {
    let dataDto = {
        id: dto.id,
        isDone: dto.is_done
    }
    return dataDto
}

module.exports = habitTrackerDto;