import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient();

async function detectLogo(fileName: string): Promise<void> {
    try {
        console.log(`Running logo detection on ${fileName}`);
        const [result] = await client.logoDetection(fileName);

        let scores: number[] = [];
        const logos = result.logoAnnotations || [];

        if (logos.length > 0) {
            logos.forEach((logo) => {
                if (logo.description) {
                    console.log(`"${logo.description}" found in file ${fileName}`);
                }
                if (logo.score) {
                    scores.push(logo.score);
                }
            });
            const avg = scores.reduce((a, b) => a + b) / scores.length;
            console.log(`Average score for ${fileName}: ${avg}`);
        } else {
            console.log(`No logos detected in ${fileName}`);
        }
    } catch (err: any) {
        // Handle file not found and other errors
        if (err.code === 'ENOENT') {
            console.log(`File ${fileName} not found`);
        } else {
            console.log(`Error processing file ${fileName}: ${err.message}`);
        }
    }
}
async function main({ fileNames }: { fileNames: string[]; }): Promise<void> {
    for (const fileName of fileNames) {
        await detectLogo(fileName);
    }
}

main({
        fileNames: [
            './images/cmu.jpg',
            './images/logo-types-collection.jpg',
            './images/not-a-file.jpg'
        ]
    });
