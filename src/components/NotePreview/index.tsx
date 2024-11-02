import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

interface Props {
  children: string;
}

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'img',
  'h1',
  'h2',
  'h3',
]);
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src'],
  },
);

export default function NotePreview({ children }: Props) {
  return (
    <div className='note-preview'>
      <div
        className='text-with-markdown'
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked(children || '') as string, {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  );
}
