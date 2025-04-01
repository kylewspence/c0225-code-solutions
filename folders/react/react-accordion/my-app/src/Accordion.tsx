// Accordion.tsx
import { useState } from 'react';
import { TopicCard } from './TopicCard';

export type Topic = {
  id: number;
  title: string;
  content: string;
};

type AccordionProps = {
  topics: Topic[];
};

export function Accordion({ topics }: AccordionProps) {
  const [openTopicId, setOpenTopicId] = useState<number | undefined>();
  return (
    <div className="accordion">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          isOpen={topic.id === openTopicId}
          onClick={() =>
            setOpenTopicId(openTopicId === topic.id ? undefined : topic.id)
          }
        />
      ))}
    </div>
  );
}
