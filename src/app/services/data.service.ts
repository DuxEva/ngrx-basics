import { Injectable } from '@angular/core';
import { combineLatest, delay, map, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { Post } from '../models/post.interface';
import { CombinedData } from '../models/combined-data.interface';

@Injectable({
  providedIn: 'root',
})
export class Service {

  user$: Observable<User> = new Observable((observer) => {
    observer.next({ id: 1, name: 'Kanova', email: 'jt@celtics.com' });
  });
  posts$: Observable<Post[]> = of([
    {
      id: 1,
      title: 'Smartphone Pro Max',
      description:
        'The latest Smartphone Pro Max comes with a 6.7-inch OLED display, A14 Bionic chip, triple-camera system, and up to 512GB of storage. It offers cutting-edge performance and stunning photography in a sleek design.',
      image:
        'https://images.pexels.com/photos/10421293/pexels-photo-10421293.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      title: 'Ultra 4K Smart TV',
      description:
        'Experience entertainment like never before with the Ultra 4K Smart TV. Featuring a 65-inch screen, HDR support, and integrated streaming apps, this TV delivers crystal-clear visuals and immersive sound.',
      image:
        'https://images.pexels.com/photos/27127440/pexels-photo-27127440/free-photo-of-tv-over-table-and-chairs.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      title: 'Wireless Noise-Cancelling Headphones',
      description:
        'Enjoy your music without distractions with these wireless noise-cancelling headphones. They offer up to 30 hours of battery life, superior sound quality, and a comfortable fit for all-day listening.',
      image:
        'https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      title: 'Smartwatch Series 6',
      description:
        'The Smartwatch Series 6 keeps you connected and healthy with its fitness tracking, heart rate monitoring, and GPS capabilities. Its sleek design and customizable watch faces make it perfect for any occasion.',
      image:
        'https://images.pexels.com/photos/9584703/pexels-photo-9584703.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 5,
      title: 'Portable Bluetooth Speaker',
      description:
        'Take your music on the go with this portable Bluetooth speaker. It features a durable, waterproof design, and delivers powerful sound with deep bass. Perfect for outdoor adventures and parties.',
      image:
        'https://images.pexels.com/photos/3779780/pexels-photo-3779780.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      title: 'Gaming Laptop X15',
      description:
        "The Gaming Laptop X15 offers top-tier performance with an Intel Core i7 processor, NVIDIA RTX 3070 graphics, and a 15.6-inch 240Hz display. It's designed for gamers who demand the best.",
      image:
        'https://images.pexels.com/photos/19012056/pexels-photo-19012056/free-photo-of-person-playing-a-computer-game.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 7,
      title: 'Electric Scooter Max',
      description:
        'The Electric Scooter Max is your perfect urban transport solution. With a top speed of 20 mph and a range of up to 40 miles, it combines speed, convenience, and eco-friendliness.',
      image:
        'https://images.pexels.com/photos/3671151/pexels-photo-3671151.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 8,
      title: 'Home Espresso Machine',
      description:
        'Brew café-quality coffee at home with this home espresso machine. It features a powerful steam wand, a built-in grinder, and programmable settings to make your perfect cup every time.',
      image:
        'https://images.pexels.com/photos/6253935/pexels-photo-6253935.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 9,
      title: 'Smart Home Hub',
      description:
        'Control all your smart devices with ease using the Smart Home Hub. It integrates with major smart home systems and supports voice commands, making home automation simple and convenient.',
      image:
        'https://images.pexels.com/photos/4050289/pexels-photo-4050289.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 10,
      title: 'Fitness Tracker Plus',
      description:
        'The Fitness Tracker Plus helps you stay on top of your health with features like step counting, sleep tracking, and heart rate monitoring. Its slim design and long battery life make it ideal for everyday use.',
      image:
        'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ]);

  getFilteredPosts(term: string): Observable<Post[]> {
    return this.posts$.pipe(
      map((posts) =>
        posts.filter(
          (post) =>
            post.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()) ||
            post.description
              .toLocaleLowerCase()
              .includes(term.toLocaleLowerCase())
        )
      )
    );
  }

  getCombinedData(): Observable<CombinedData> {
    return combineLatest([this.user$, this.posts$]).pipe(
      delay(750),
      map(([user, posts]) => ({ user, posts }))
    );
  }
  getCombinedFilteredData(term: string): Observable<CombinedData> {
    return combineLatest([this.user$, this.getFilteredPosts(term)]).pipe(
      delay(500),
      map(([user, posts]) => ({ user, posts }))
    );
  }
}
