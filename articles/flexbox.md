# Flexbox : Les modèles de boîtes

Le module Flexbox (Flexible Box Layout) est une spécification CSS qui permet de créer des mises en page flexibles et efficaces. Il facilite l’alignement, la distribution de l’espace et l’organisation des éléments dans un conteneur, même lorsque leur taille est inconnue ou dynamique.

## 1. Introduction à Flexbox

Flexbox est conçu pour résoudre les problèmes de mise en page complexes, notamment l’alignement vertical et horizontal, la gestion de l’espace entre les éléments, et la réorganisation automatique des éléments selon la taille du conteneur.

Pour utiliser Flexbox, il suffit d’appliquer la propriété `display: flex` ou `display: inline-flex` à un conteneur.

```css
.container {
    display: flex;
}
```

## 2. Les concepts clés

### Le conteneur flex

Le conteneur flex est l’élément parent sur lequel on applique `display: flex`. Tous ses enfants deviennent des éléments flexibles.

### Les éléments flex

Les enfants directs du conteneur flex sont appelés éléments flex. Ils peuvent être manipulés individuellement grâce à différentes propriétés.

## 3. Les propriétés du conteneur flex

### `flex-direction`

Définit la direction principale des éléments :

- `row` (par défaut) : de gauche à droite
- `row-reverse` : de droite à gauche
- `column` : de haut en bas
- `column-reverse` : de bas en haut

```css
.container {
    flex-direction: row;
}
```

### `flex-wrap`

Permet aux éléments de passer à la ligne si l’espace manque :

- `nowrap` (par défaut) : tout sur une seule ligne
- `wrap` : retour à la ligne
- `wrap-reverse` : retour à la ligne en sens inverse

```css
.container {
    flex-wrap: wrap;
}
```

### `justify-content`

Contrôle l’alignement des éléments sur l’axe principal :

- `flex-start` (par défaut)
- `flex-end`
- `center`
- `space-between`
- `space-around`
- `space-evenly`

```css
.container {
    justify-content: center;
}
```

### `align-items`

Contrôle l’alignement sur l’axe secondaire :

- `stretch` (par défaut)
- `flex-start`
- `flex-end`
- `center`
- `baseline`

```css
.container {
    align-items: flex-end;
}
```

### `align-content`

Gère l’alignement des lignes multiples (si `flex-wrap` est utilisé) :

- `stretch` (par défaut)
- `flex-start`
- `flex-end`
- `center`
- `space-between`
- `space-around`

```css
.container {
    align-content: space-between;
}
```

## 4. Les propriétés des éléments flex

### `flex-grow`

Définit la capacité d’un élément à grandir pour occuper l’espace disponible.

```css
.item {
    flex-grow: 2;
}
```

### `flex-shrink`

Définit la capacité d’un élément à rétrécir si l’espace manque.

```css
.item {
    flex-shrink: 1;
}
```

### `flex-basis`

Définit la taille initiale de l’élément avant la distribution de l’espace.

```css
.item {
    flex-basis: 200px;
}
```

### `flex`

Shorthand pour `flex-grow`, `flex-shrink` et `flex-basis`.

```css
.item {
    flex: 1 1 100px;
}
```

### `align-self`

Permet d’aligner individuellement un élément sur l’axe secondaire.

```css
.item {
    align-self: center;
}
```

## 5. Exemple complet

```html
<div class="container">
    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>
</div>
```

```css
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.item {
    flex: 1 1 150px;
    margin: 10px;
}
```

## 6. Avantages de Flexbox

- Alignement facile des éléments
- Distribution automatique de l’espace
- Réorganisation dynamique selon la taille du conteneur
- Compatible avec les mises en page responsives

## 7. Limites

Flexbox est idéal pour les mises en page linéaires (une dimension). Pour des mises en page en deux dimensions (lignes et colonnes), CSS Grid est plus adapté.

## 8. Conclusion

Flexbox simplifie la création de mises en page modernes et adaptatives. Maîtriser ses propriétés permet de concevoir des interfaces flexibles et élégantes, tout en réduisant la complexité du CSS.
