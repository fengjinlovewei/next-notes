import path from 'path';
import fs from 'fs';

export function mkdirFolder(name = '../public/uploads/') {
  const folderPath = path.join(__dirname, name);

  // 判断文件夹是否存在
  if (!fs.existsSync(folderPath)) {
    // 如果文件夹不存在，则创建它
    fs.mkdirSync(folderPath);
    console.log('文件夹已创建');
  } else {
    console.log('文件夹已存在');
  }
}

// 这个方法可以被 fse.emptyDirSync 代替了
export function deleteFolder(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    // console.log(folderPath + ':路径不存在');
    return;
  }

  if (fs.lstatSync(folderPath).isDirectory()) {
    // 读取文件夹内容
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const curPath = path.join(folderPath, file);
      deleteFolder(curPath);
    }
    // 删除文件夹自身
    fs.rmdirSync(folderPath);
  } else {
    // 删除文件
    fs.unlinkSync(folderPath);
  }
}
