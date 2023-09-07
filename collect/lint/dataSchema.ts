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
            },
            lastUpdated: {
                type: 'string',
                pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
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
            'country',
            'lastUpdated'
        ]
    }
};

export default markerSchema;
