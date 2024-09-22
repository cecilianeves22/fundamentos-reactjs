import {useState} from 'react';
import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import {format, formatDistanceToNow} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


export function Post({author, publishAt, content}){

const [comments, setComments] = useState([
   'Post top!'
])

const [newCommentText, setNewCommentText] = useState('')


const publishedDateFormatted = format(publishAt,"d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
})

const publishedDateRelativeToNow = formatDistanceToNow(publishAt, {
    locale: ptBR,
    addSuffix: true,
})

function handleCreateNewComment(){
    event.preventDefault()

   
   setComments([...comments, newCommentText]);
   setNewCommentText('');

}

function handleNewCommentChange(){
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
}

function handleNewCommentInvalid(){
    event.target.setCustomValidity('Esse campo é obrigatório!');
}

function deleteComment(commentToDelete){
    const commetsWithoutDeletedOne = comments.filter(comment =>{
        return comment != commentToDelete;
    })
    setComments(commetsWithoutDeletedOne);

}

const isNewCommentEmpty = newCommentText.length === 0

return(
    <article className={styles.post}>
        <header>
            <div className={styles.author}>
            <Avatar src={author.avatarUrl}/>
            <div className={styles.authorInfo}>
                <strong>{author.name}</strong>
                <span>{author.role}</span>
            </div>
            </div>
            <time title={publishedDateFormatted} dateTime={publishAt.toISOString()}>{publishedDateRelativeToNow}</time>
        </header>

        <div className={styles.content}>
            {content.map(line => {
                if(line.type === 'paragraph'){
                    return<p key={line.content}>{line.content}</p>
                }else if (line.type === 'link'){
                    return<p key={line.content}><a href="#">{line.content}</a></p>
                }
            })}
        </div>

        <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
            <strong>Deixe seu feedback</strong>
            <textarea 
            name="comment" 
            placeholder="Deixe um comentário" 
            onChange={handleNewCommentChange} 
            onInvalid={handleNewCommentInvalid}
            required
            value={newCommentText}/>
            <footer>
            <button type="submit" disabled={isNewCommentEmpty}>
                Publicar
                </button>
            </footer>
        </form>

        <div className={styles.commentList}>
            {comments.map(comment =>{
                return (
                <Comment 
                    key={comment} 
                    content={comment} 
                    onDeleteComment={deleteComment}
                    />
                )
            })}
        </div>
    </article>
)
}