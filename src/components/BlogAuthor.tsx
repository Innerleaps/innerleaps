import { Calendar, User } from 'lucide-react';
interface BlogAuthorProps {
  authorName: string;
  authorLinkedIn: string;
  publishDate: string;
  lastUpdated?: string;
}
const BlogAuthor = ({
  authorName,
  authorLinkedIn,
  publishDate,
  lastUpdated
}: BlogAuthorProps) => {
  return <div className="flex flex-wrap items-center gap-4 text-brand-gray-dark mb-6">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <a href={authorLinkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors underline">
          {authorName}
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <time dateTime={publishDate}>{new Date(publishDate).toLocaleDateString('nl-NL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}</time>
      </div>
    </div>;
};
export default BlogAuthor;