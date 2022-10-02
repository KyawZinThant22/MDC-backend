const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: String,
      required: [true, "post is required"],
    },
    like: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: [
        {
          comment: {
            type: String,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
