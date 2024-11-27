import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Topic } from '@/lib/types'

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Card className="h-full">
      <CardHeader className="p-0">
        <Image
          src={topic.imageUrl}
          alt={topic.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{topic.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{topic.description}</p>
      </CardContent>
    </Card>
  )
}

