export default function NoteListSkeleton() {
  return (
    <div>
      <ul className='notes-list skeleton-container'>
        {Array(3)
          .fill(0)
          .map((item, index) => {
            return (
              <li className='v-stack' key={index}>
                <div
                  className='sidebar-note-list-item skeleton'
                  style={{ height: '5em' }}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
