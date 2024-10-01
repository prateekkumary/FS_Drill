import { promises as fs } from "fs";

export async function processFiles(path) {
    try {
        const data = await readFile(path);
        const upperFileName = await toUppercase(data);
        const sentencesFileName = await splitToSentences(upperFileName);
        const sortedFileName = await sort(sentencesFileName);
        await deleteFiles(sortedFileName);
    } catch (error) {
        console.error("Error in processing files:", error);
    }
}

async function readFile(path) {
    try {
        const data = await fs.readFile(path, "utf-8");
        return data;
    } catch (err) {
        console.error("Error reading file:", err);
        throw err;
    }
}

async function toUppercase(data) {
    const uppercasedData = data.toUpperCase();
    const upperFileName = "uppercase.txt";

    await fs.writeFile(upperFileName, uppercasedData);
    console.log("Uppercase file saved");
    await fs.writeFile("./filenames.txt", `${upperFileName}\n`);
    console.log("Uppercase file name added to filenames.txt");
    return upperFileName;
}

async function splitToSentences(upperFileName) {
    const data = await fs.readFile(upperFileName, "utf-8");
    const lowerCaseData = data.toLowerCase().split(".").join("\n");
    const sentencesFileName = "sentences.txt";

    await fs.writeFile(sentencesFileName, lowerCaseData);
    console.log("Sentences file written successfully");
    await fs.appendFile("./filenames.txt", `${sentencesFileName}\n`);
    return sentencesFileName;
}

async function sort(sentencesFileName) {
    const data = await fs.readFile(sentencesFileName, "utf-8");
    const sortedData = data.split("\n").sort().join("\n");
    const sortedFileName = "sortData.txt";

    await fs.writeFile(sortedFileName, sortedData);
    console.log("Sorted data file written successfully");
    await fs.appendFile("./filenames.txt", `${sortedFileName}\n`);
    return sortedFileName;
}

async function deleteFiles(sortedFileName) {
    const data = await fs.readFile("./filenames.txt", "utf-8");
    const files = data.split("\n").filter((file) => file); // Remove empty lines

    await Promise.all(
        files.map(async (file) => {
            await fs.unlink(file);
            console.log(`${file} deleted successfully`);
        })
    );
}

// Example usage
// processFiles();
