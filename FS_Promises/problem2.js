import { promises as fs } from "fs";

/*
    Problem 2 (Promise version without async/await):
    
    Using promises and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

export function readFile(path) {
    fs.readFile(path, "utf-8")
        .then((data) => toUppercase(data))
        .catch((err) => {
            console.error("Error reading file:", err);
        });
}

function toUppercase(data) {
    const uppercasedData = data.toUpperCase();

    fs.writeFile("uppercase.txt", uppercasedData)
        .then(() => {
            console.log("Uppercase file saved");
            return fs.writeFile("./filenames.txt", "uppercase.txt\n");
        })
        .then(() => {
            console.log("Uppercase file name added to filenames.txt");
            return splitToSentences();
        })
        .catch((err) => {
            console.error("Error processing uppercase file:", err);
        });
}

function splitToSentences() {
    fs.readFile("uppercase.txt", "utf-8")
        .then((data) => {
            const lowerCaseData = data.toLowerCase().split(".").join("\n");
            return fs.writeFile("sentences.txt", lowerCaseData);
        })
        .then(() => {
            console.log("Sentences file written successfully");
            return fs.appendFile("./filenames.txt", "sentences.txt\n");
        })
        .then(() => sort())
        .catch((err) => {
            console.error("Error processing sentences file:", err);
        });
}

function sort() {
    fs.readFile("sentences.txt", "utf-8")
        .then((data) => {
            const sortedData = data.split(" ").sort().join(" ");
            return fs.writeFile("sortData.txt", sortedData);
        })
        .then(() => {
            console.log("Sorted data file written successfully");
            return fs.appendFile("./filenames.txt", "sortData.txt\n");
        })
        .then(() => deletion())
        .catch((err) => {
            console.error("Error processing sorted file:", err);
        });
}

function deletion() {
    fs.readFile("./filenames.txt", "utf-8")
        .then((data) => {
            const files = data.split("\n").filter((file) => file); // Remove empty lines
            return Promise.all(
                files.map((file) => {
                    return fs.unlink(file).then(() => {
                        console.log(`${file} deleted successfully`);
                    });
                })
            );
        })
        .catch((err) => {
            console.error("Error during file deletion:", err);
        });
}
