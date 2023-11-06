import fs from "fs";
import path from "path";
import getDiff from "../src/calcDiff.js";

const fileExt = [".json", ".yml"];

const getPath = (filename) => path.resolve('__fixtures__', filename);

const resultStylish = fs.readFileSync(
	path.resolve(process.cwd(), "__fixtures__/result.txt"),
	"utf-8"
);
const resultPlain = fs.readFileSync(
	path.resolve(process.cwd(), "__fixtures__/result-plain.txt"),
	"utf-8"
);

test.each(fileExt)("testing different file options", (format) => {
	const filename1 = getPath(`file1${format}`);
	const filename2 = getPath(`file2${format}`);
	const actual1 = getDiff(filename1, filename2, "stylish");
	expect(actual1).toEqual(resultStylish);
	const actual2 = getDiff(filename1, filename2, "plain");
	expect(actual2).toEqual(resultPlain);
	const actual4 = getDiff(filename1, filename2);
	expect(actual4).toEqual(resultStylish);
});