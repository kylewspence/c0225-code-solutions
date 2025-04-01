// TopicCard.tsx
import './TopicCard.css';
import type { Topic } from './Accordion';

type TopicCardProps = {
  topic: Topic;
  isOpen: boolean;
  onClick: () => void;
};

export function TopicCard({ topic, isOpen, onClick }: TopicCardProps) {
  return (
    <div className="topic-card">
      <div onClick={onClick}>
        {isOpen ? '🔽' : '▶️'} {topic.title}
      </div>
      <div className={`topic-content ${isOpen ? 'open' : ''}`}>
        <p>{topic.content}</p>
      </div>
    </div>
  );
}
