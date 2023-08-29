const markerSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            name: {
                type: 'string'
            },
            expected: {
                type: 'number'
            },
            actual: {
                type: 'number'
            },
            expectedSource: {
                type: 'string'
            },
            actualSource: {
                type: 'string'
            },
            tags: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            description: {
                type: 'string'
            },
            country: {
                type: 'string'
            }
        },
        required: [
            'id',
            'name',
            'expected',
            'actual',
            'expectedSource',
            'actualSource',
            'tags',
            'description',
            'country'
        ]
    }
};

export default markerSchema;
