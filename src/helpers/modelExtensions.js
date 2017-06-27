import { Map, List } from 'immutable';

export function addSignedAvatarUrl(s3, user) {
  let params = {Bucket: process.env.AWS_S3_BUCKET_NAME, Key: user.local.avatarFileName};
  let url = s3.getSignedUrl('getObject', params);
  return Map(user.toObject()).set("avatarSignedUrl", url)
}

export function populateUserWithMemories(Memory, s3, user, bucketName, res){
  let updatedUser;
  Memory.find({ _user: user.get("_id") }).
  exec((err, memories) => {
      if (err) return handleError(err);

      let updatedMemories = memories.map(memory => {
        let params = {Bucket: bucketName, Key: memory.filename};
        let url = s3.getSignedUrl('getObject', params);
        let memoryObject = Map(memory.toObject());
        return memoryObject.set("signedUrl", url)
      })

    updatedUser = user.set("memoryObjects", List(updatedMemories));

    return res.send(JSON.stringify({ success: true, message: "", user: updatedUser }));
  });

}

export function uploadImage(s3, fileName, fileExtension, buffer, res, memory) {
  s3.putObject({
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName + "." + fileExtension,
    Body: buffer,
    ContentType: 'image/' + fileExtension
  }, function(error, response) {

    if(error){
      throw err;
    }

    let params = {Bucket: process.env.AWS_S3_BUCKET_NAME, Key: memory.filename};
    let url = s3.getSignedUrl('getObject', params);
    let memoryObject = Map(memory.toObject()).set("signedUrl", url);

    return res.send(JSON.stringify({ success: true, memory: memoryObject}));
  });
}

export function setPreviewImageUrl(file, instance){
  let img = new Image;
  let _this = instance;

  img.onload = function() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let MAX_WIDTH = 500;
    let MAX_HEIGHT = 500;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    let dataUrl = canvas.toDataURL("image/jpg");
    _this.setState({
      imagePreviewUrl: dataUrl
    })
  }

  if(file){
    img.src = URL.createObjectURL(file);
  }
}
