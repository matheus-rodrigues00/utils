const utils = require("@teteu/utils");

interface MockObject {
  id: number;
  name: string;
}
interface GroupedByObject {
  [key: string]: MockObject[];
}

const arr: MockObject[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "John" },
  { id: 4, name: "Jane" },
];
const grouped_by: GroupedByObject = utils.groupBy(arr, "name");

console.log(grouped_by);
/*
{
  John: [
    { id: 1, name: "John" },
    { id: 3, name: "John" },
  ],
  Jane: [
    { id: 2, name: "Jane" },
    { id: 4, name: "Jane" },
  ],
};
*/
