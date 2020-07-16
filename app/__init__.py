from flask import Flask, render_template, jsonify
from flask.globals import request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError


app = Flask(__name__)
app.config['SECRET_KET'] = 'NoT SeCrEcT1'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False, unique=True)
    content = db.Column(db.Text, nullable=False)


db.create_all()


@app.route('/')
@app.route('/<path:path>')
def index(**kwargs):
    return render_template('index.html')


@app.route('/api/post')
def api_posts():
    posts = Posts.query.all()
    return jsonify([{"id": post.id, "title": post.title, "content": post.content} for post in posts])


@app.route('/api/post/new', methods=["POST"])
def api_new_post():
    return_data = {"success": True}
    try:
        new_post = Posts(
            title=request.json['title'],
            content=request.json['content'],
        )
        db.session.add(new_post)
        db.session.commit()
    except KeyError:
        return_data["success"] = False
    except IntegrityError:
        return_data["success"] = False
        return_data["message"] = f"Sorry but a post with the title '{request.json['content']}' already exists."
    return jsonify(return_data)


@app.route('/api/post/<int:id>', methods=["DELETE"])
def delete_post(id):
    db.session.delete(Posts.query.get(id))
    db.session.commit()
    return jsonify([])


if __name__ == "__main__":
    app.run()
