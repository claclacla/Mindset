import mapObjectToTrainingSession from "../src/app/mappers/mapObjectToTrainingSession";
import { TrainingSession } from "../src/app/entities/TrainingSession";

describe("mapObjectToTrainingSession", () => {
    it("should correctly map an object to a TrainingSession", () => {
        const input = {
            id: 123,
            lastName: "Dubois",
            firstName: "John",
            age: 25,
            distance: 10.5
        };

        const expected: TrainingSession = {
            id: 123,
            lastName: "Dubois",
            firstName: "John",
            age: 25,
            distance: 10.5
        };

        const result = mapObjectToTrainingSession(input);

        expect(result).toEqual(expected);
        expect(result).toMatchObject(expected);
        expect(typeof result.id).toBe("number");
        expect(typeof result.age).toBe("number");
    });

    it("should handle missing properties gracefully", () => {
        const input = { id: 456, firstName: "Alice" };

        const result = mapObjectToTrainingSession(input);

        expect(result).toEqual({
            id: 456,
            firstName: "Alice",
            lastName: undefined,
            age: undefined,
            distance: undefined
        });
    });

    it("should return default values when input is empty", () => {
        const result = mapObjectToTrainingSession({});

        expect(result).toEqual({
            id: undefined,
            lastName: undefined,
            firstName: undefined,
            age: undefined,
            distance: undefined
        });
    });
});
