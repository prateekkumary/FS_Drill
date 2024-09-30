import { promises as fs } from 'fs';

export async function createDirectory(path, numFiles) {
    try {
        await fs.mkdir(path);
        console.log(`${path} directory created`);
        await createFiles(path, numFiles);
    } catch (err) {
        console.log('Error creating directory:', err);
    }
}

async function createFiles(path, numFiles) {
    const fileNames = [];

    for (let i = 0; i < numFiles; i++) {
        const filename = `files-${i}.json`;
        try {
            await fs.writeFile(`${path}/${filename}`, " "); // Create an empty file
            console.log(`${filename} is created successfully`);
            fileNames.push(filename);
        } catch (err) {
            console.log("Error creating file:", err);
        }
    }

    await deleteFiles(path, fileNames);
}

async function deleteFiles(path, fileNames) {
    const deletePromises = fileNames.map(async (filename) => {
        try {
            await fs.unlink(`${path}/${filename}`);
            console.log(`${filename} successfully deleted`);
        } catch (err) {
            console.log("Error deleting file:", err);
        }
    });

    await Promise.all(deletePromises);
    console.log("All files are deleted successfully");
}

// Example usage
// const result = createDirectory('./randomFiles', 2);
