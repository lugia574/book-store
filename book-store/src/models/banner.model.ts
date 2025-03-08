export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  target: string;
}

// target 은 url 이 있으면 항상 같이 따라 붙는 파라미터라네?
// 새창으로 가거나 이전창으로 가거나 그걸 tartget 을 통해 할 수 있다는데??
// 왜? url로 가고 하는거 아녀? 이전은 음 뒤로가기 안되나?
