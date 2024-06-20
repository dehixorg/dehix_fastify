const errorSchema = {
  type: 'object',
  additionalProperties: true,
  properties: {
    code: { type: 'string' },
    expected: { type: 'string' },
    received: { type: 'string' },
    path: {
      type: 'array',
      items: { type: 'string' },
    },
    message: { type: 'string' },
  },
};

const subSectionSchema = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: errorSchema,
    },
    is_completed: { type: 'boolean' },
  },
};

export const overviewSchema = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: errorSchema,
    },
    is_completed: { type: 'boolean' },
    sub_section: {
      type: 'object',
      properties: {
        basic_details: subSectionSchema,
        additional_details: subSectionSchema,
        location: subSectionSchema,
        venue_type : subSectionSchema,
        event_type : subSectionSchema
      },
    },
  },
};

export const sectionSchema = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: errorSchema,
    },
    is_completed: { type: 'boolean' },
  },
};

const amenitiesSubSectionSchema = {
  type: 'object',
  properties: {
    room: subSectionSchema,
    business: subSectionSchema,
    recreational: subSectionSchema,
  },
};

export const amenitiesSchema = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: errorSchema,
    },
    is_completed: { type: 'boolean' },
    sub_section: amenitiesSubSectionSchema,
  },
};

const facilitiesAndEquipmentsSubsectionsSchema = {
  type: 'object',
  properties: {
    facilities: subSectionSchema,
    equipments: subSectionSchema,
  },
}


export const facilitiesAndEquipments = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: errorSchema,
    },
    is_completed: { type: 'boolean' },
    sub_section: facilitiesAndEquipmentsSubsectionsSchema,
  },

}
