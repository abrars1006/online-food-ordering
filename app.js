(function () {
    'use strict';

    // Main AngularJS module and single-page ordering controller.
    angular.module('foodOrderApp', [])
        .controller('FoodOrderController', ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.view = 'menu';
            $scope.searchText = '';
            $scope.selectedCategory = 'All';
            $scope.categories = ['All', 'Biryani', 'Pizza', 'Burger', 'South Indian', 'Chinese', 'Snacks'];
            $scope.cart = [];
            $scope.checkout = {};
            $scope.placedOrder = null;

            // Food data is rendered by ng-repeat and filtered by category and search.
            $scope.foods = [
                { id: 1, name: 'Chicken Biryani', category: 'Biryani', description: 'Fragrant basmati rice, slow-cooked with warming spices.', price: 180, available: true, icon: '🍛', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=85' },
                { id: 2, name: 'Chicken Burger', category: 'Burger', description: 'Juicy grilled chicken, crisp lettuce and house sauce.', price: 150, available: true, icon: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85' },
                { id: 3, name: 'Margherita Pizza', category: 'Pizza', description: 'A classic of tomato, fresh basil and stretchy mozzarella.', price: 220, available: true, icon: '🍕', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85' },
                { id: 4, name: 'Chicken Pizza', category: 'Pizza', description: 'Stone-baked with tender chicken and golden cheese.', price: 280, available: false, icon: '🍕', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85' },
                { id: 5, name: 'Masala Dosa', category: 'South Indian', description: 'Crisp rice crepe with spiced potato and coconut chutney.', price: 100, available: true, icon: '🥞', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85' },
                { id: 6, name: 'Paneer Butter Masala', category: 'North Indian', description: 'Soft paneer in a silky, gently spiced tomato gravy.', price: 190, available: true, icon: '🍲', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85' },
                { id: 7, name: 'Chicken Fried Rice', category: 'Chinese', description: 'Wok-tossed rice with chicken, vegetables and spring onion.', price: 170, available: true, icon: '🍚', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85' },
                { id: 8, name: 'French Fries', category: 'Snacks', description: 'Golden, crisp-cut potatoes with a pinch of sea salt.', price: 90, available: true, icon: '🍟', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85' },
                { id: 9, name: 'Chicken Shawarma', category: 'Snacks', description: 'Spiced chicken, crunchy salad and creamy garlic sauce.', price: 160, available: true, icon: '🌯', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85' },
                { id: 10, name: 'Veg Noodles', category: 'Chinese', description: 'Springy noodles tossed with market-fresh vegetables.', price: 130, available: true, icon: '🍜', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85' }
            ];

            $scope.matchesFood = function (food) {
                var query = ($scope.searchText || '').trim().toLowerCase();
                var matchesCategory = $scope.selectedCategory === 'All' || food.category === $scope.selectedCategory;
                var matchesSearch = !query || food.name.toLowerCase().indexOf(query) !== -1 || food.category.toLowerCase().indexOf(query) !== -1;
                return matchesCategory && matchesSearch;
            };

            $scope.selectCategory = function (category) {
                $scope.selectedCategory = category;
            };

            $scope.goTo = function (nextView) {
                if (nextView === 'checkout' && $scope.cart.length === 0) {
                    $scope.view = 'cart';
                    return;
                }
                $scope.view = nextView;
                window.scrollTo(0, 0);
            };

            $scope.scrollToMenu = function () {
                var menu = document.getElementById('menu-list');
                if (menu) {
                    menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };

            $scope.addToCart = function (food) {
                if (!food.available) {
                    return;
                }
                var cartItem = $scope.cart.find(function (item) { return item.id === food.id; });
                if (cartItem) {
                    cartItem.quantity += 1;
                } else {
                    $scope.cart.push(angular.extend({}, food, { quantity: 1 }));
                }
                food.justAdded = true;
                $timeout(function () { food.justAdded = false; }, 1100);
            };

            $scope.changeQuantity = function (item, amount) {
                item.quantity = Math.max(1, item.quantity + amount);
            };

            $scope.removeFromCart = function (item) {
                $scope.cart = $scope.cart.filter(function (cartItem) { return cartItem.id !== item.id; });
            };

            $scope.getCartCount = function () {
                return $scope.cart.reduce(function (count, item) { return count + item.quantity; }, 0);
            };

            $scope.getTotal = function () {
                return $scope.cart.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
            };

            $scope.placeOrder = function (form) {
                if (!form || form.$invalid || $scope.cart.length === 0) {
                    if (form) {
                        form.$setSubmitted();
                    }
                    return;
                }
                $scope.placedOrder = {
                    id: 'GG-' + Date.now().toString().slice(-7),
                    customer: angular.copy($scope.checkout),
                    items: angular.copy($scope.cart),
                    total: $scope.getTotal()
                };
                $scope.cart = [];
                $scope.checkout = {};
                $scope.view = 'success';
                window.scrollTo(0, 0);
            };

            $scope.backToMenu = function () {
                $scope.placedOrder = null;
                $scope.searchText = '';
                $scope.selectedCategory = 'All';
                $scope.view = 'menu';
                window.scrollTo(0, 0);
            };
        }]);
}());
