## What to do so you can connect to vercel db
Link dir to vercel project
```
vercel link
```

Get local enviroment variables
```
vercel env pull .env
``` 

Manage db records
```
npx prisma studio
```

After editing prisma/schema.prisma run this command to update changes
```
npx prisma generate
```
Sometimes you need to migrate it first
```
npx prisma migrate dev --name init
```