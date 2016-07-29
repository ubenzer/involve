export class Comment {
  constructor(
    public contentId: string,
    public name: string,
    public text: string,
    public isPublished: boolean,
    public date: Date,
    public userId: string
  ) { }

  getObjectForContentByIdStorage() {
    return {
      name: this.name,
      text: this.text,
      isPublished: this.isPublished,
      date: +this.date,
      userId: this.userId
    }
  }
}
