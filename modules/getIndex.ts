// 
// Get gameData Indexes
// 

// Return the class index based on class name
const getClassIndex = (className: string): number | undefined => {
    switch (className) {
        case 'archer':
            return 0
        case 'cleric':
            return 1
        case 'magician':
            return 2
        case 'warrior':
            return 3
    }
}

// Return the race index based on race name
const getRaceIndex = (raceName: string): number => {
    switch (raceName) {
        case 'aven':
            return 0
        case 'breken':
            return 1
        case 'kyrek':
            return 2
        case 'rokoll':
            return 3
        case 'silmaeri':
            return 4
        default:
            return 0
    }
}

// Return the element index based on element name
const getElementIndex = (elementName: string): number | undefined => {
    switch (elementName) {
        case 'air':
            return 0
        case 'earth':
            return 1
        case 'fire':
            return 2
        case 'water':
            return 3
    }
}

// Return the Techniques index based on class and element
const getClassTechIndex = (className: string, elementName: string): number | undefined => {
    if (className === 'wizard') {
        switch (elementName) {
            case 'air':
                return 2
            case 'earth':
                return 3
            case 'fire':
                return 4
            case 'water':
                return 5
        }
    }
    else {
        switch (className) {
            case 'archer':
                return 0
            case 'cleric':
                return 1
            case 'warrior':
                return 6
        }
    }
}

export { getClassIndex, getRaceIndex, getElementIndex, getClassTechIndex }