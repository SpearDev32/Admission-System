package com.system.sias.mapper;

import com.system.sias.dto.CourseChoiceDto;
import com.system.sias.entity.CourseChoice;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    public CourseChoice toChoiceEntity(CourseChoiceDto dto) {
        if (dto == null) return null;
        CourseChoice entity = new CourseChoice();
        // Note: The actual Course entity and Application entity
        // will be linked in the Service layer using the IDs provided.
        entity.setPriorityLevel(dto.getPriorityLevel());
        return entity;
    }
}