import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // เพิ่มข้อมูลทดสอบสำหรับ NewsUpdateDB
    const newsUpdates = [
        {
            title: "News Title 1",
            img: "https://example.com/image1.jpg",
            description: "Description for news 1",
            creditlink: "https://example.com/news1",
            createdBy: "system"
        },
        {
            title: "News Title 2",
            img: "https://example.com/image2.jpg",
            description: "Description for news 2",
            creditlink: "https://example.com/news2",
            createdBy: "system"
        },
        {
            title: "News Title 3",
            img: "https://example.com/image3.jpg",
            description: "Description for news 3",
            creditlink: "https://example.com/news3",
            createdBy: "system"
        },
        {
            title: "News Title 4",
            img: "https://example.com/image4.jpg",
            description: "Description for news 4",
            creditlink: "https://example.com/news4",
            createdBy: "system"
        },
        {
            title: "News Title 5",
            img: "https://example.com/image5.jpg",
            description: "Description for news 5",
            creditlink: "https://example.com/news5",
            createdBy: "system"
        },
        {
            title: "News Title 6",
            img: "https://example.com/image6.jpg",
            description: "Description for news 6",
            creditlink: "https://example.com/news6",
            createdBy: "system"
        },
        {
            title: "News Title 7",
            img: "https://example.com/image7.jpg",
            description: "Description for news 7",
            creditlink: "https://example.com/news7",
            createdBy: "system"
        },
        {
            title: "News Title 8",
            img: "https://example.com/image8.jpg",
            description: "Description for news 8",
            creditlink: "https://example.com/news8",
            createdBy: "system"
        },
        {
            title: "News Title 9",
            img: "https://example.com/image9.jpg",
            description: "Description for news 9",
            creditlink: "https://example.com/news9",
            createdBy: "system"
        },
        {
            title: "News Title 10",
            img: "https://example.com/image10.jpg",
            description: "Description for news 10",
            creditlink: "https://example.com/news10",
            createdBy: "system"
        },
        {
            title: "News Title 11",
            img: "https://example.com/image11.jpg",
            description: "Description for news 11",
            creditlink: "https://example.com/news11",
            createdBy: "system"
        },
        {
            title: "News Title 12",
            img: "https://example.com/image12.jpg",
            description: "Description for news 12",
            creditlink: "https://example.com/news12",
            createdBy: "system"
        },
        {
            title: "News Title 13",
            img: "https://example.com/image13.jpg",
            description: "Description for news 13",
            creditlink: "https://example.com/news13",
            createdBy: "system"
        },
        {
            title: "News Title 14",
            img: "https://example.com/image14.jpg",
            description: "Description for news 14",
            creditlink: "https://example.com/news14",
            createdBy: "system"
        },
        {
            title: "News Title 15",
            img: "https://example.com/image15.jpg",
            description: "Description for news 15",
            creditlink: "https://example.com/news15",
            createdBy: "system"
        },
        {
            title: "News Title 16",
            img: "https://example.com/image16.jpg",
            description: "Description for news 16",
            creditlink: "https://example.com/news16",
            createdBy: "system"
        },
        {
            title: "News Title 17",
            img: "https://example.com/image17.jpg",
            description: "Description for news 17",
            creditlink: "https://example.com/news17",
            createdBy: "system"
        },
        {
            title: "News Title 18",
            img: "https://example.com/image18.jpg",
            description: "Description for news 18",
            creditlink: "https://example.com/news18",
            createdBy: "system"
        },
        {
            title: "News Title 19",
            img: "https://example.com/image19.jpg",
            description: "Description for news 19",
            creditlink: "https://example.com/news19",
            createdBy: "system"
        },
        {
            title: "News Title 20",
            img: "https://example.com/image20.jpg",
            description: "Description for news 20",
            creditlink: "https://example.com/news20",
            createdBy: "system"
        }
    ];

    for (const news of newsUpdates) {
        await prisma.newsUpdateDB.create({
            data: news
        });
    }

    console.log(`Created ${newsUpdates.length} news updates.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
